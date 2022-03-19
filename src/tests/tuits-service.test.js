import {
    createTuit,
    findAllTuits,
    findTuitById, deleteTuit, updateTuit
} from "../services/tuits-service";
import {
    deleteUsersByUsername, createUser
} from "../services/users-service";

const user1 = {
    username: 'newUser',
    password: 'newUser123',
    email: 'new@user.com'
}

describe('can create tuit with REST API', () => {
  // TODO: implement this
    const tuit1 = {
        _id: '6201f769fa48a047ed68c081',
        tuit: 'sample tuit!',
        //postedBy : user1._id,

    };

    beforeAll(async () => {
        await deleteTuit(tuit1._id);
        return await deleteUsersByUsername(user1.username);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuit(tuit1._id);
        return deleteUsersByUsername(user1.username);
    })

    test('can insert new tuits with REST API', async () => {
        const userCreated = await createUser(user1);
        const tuitCreated = await createTuit(userCreated._id,tuit1);
        expect(tuitCreated.tuit).toEqual(tuit1.tuit);
    });
});

describe('can delete tuit wtih REST API', () => {
  // TODO: implement this
    const tuitPosted = {
        _id: '6201f769fa48a047ed68c081',
        tuit: 'sample tuit',
        //postedBy: user1._id,
    };

    beforeAll(async () => {
        await deleteTuit(tuitPosted._id);
        await deleteUsersByUsername(user1.username);
    });

    afterAll(async () => {
        await deleteTuit(tuitPosted._id);
        return await deleteUsersByUsername(user1.username);
    });

    test('can delete tuit with REST API', async () => {
        const userCreated = await createUser(user1);
        const tuitCreated= await createTuit(userCreated._id, tuitPosted);
        const status = await deleteTuit(tuitCreated._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
    const tuit1 = {
        _id: '6201f769fa48a047ed68c081',
        tuit: 'sample tuit',
        //postedBy: user1._id,
    };

    beforeAll(async () => {
        await deleteTuit(tuit1._id);
        await deleteUsersByUsername(user1.username);
    });

    afterAll(async () => {
        await deleteTuit(tuit1._id);
        return await deleteUsersByUsername(user1.username);
    });

    test('can delete tuit with REST API', async () => {
        const userCreated = await createUser(user1);
        const tuitCreated= await createTuit(userCreated._id, tuit1);
        const retrievedTuit = await findTuitById(tuit1._id);
        expect(retrievedTuit.tuit).toEqual(tuit1.tuit);
        expect(retrievedTuit.postedBy).toEqual(userCreated._id);
    });

});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
    const tuitList = [
        {
            _id: '6201f769fa48a047ed68c081',
            tuit: 'sample tuit 1',
        },
        {
            _id: '6201f769fa48a047ed68c082',
            tuit: 'sample tuit 2',
        },
        {
            _id: '6201f769fa48a047ed68c083',
            tuit: 'sample tuit 3',
        }
    ];

    beforeAll(async () => {
        // remove user and tuits to delete in test
        Promise.all(tuitList.map(async (tuit) => await deleteTuit(tuit._id)));
        return deleteUsersByUsername(user1.username);
    });

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        Promise.all(tuitList.map(async (tuit) => await deleteTuit(tuit._id)));
        return deleteUsersByUsername(user1.username);
    });

    test('can retrieve all tuits with REST API', async () => {
        const userCreated = await createUser(user1);
        await Promise.all(tuitList.map(async (tuit) => {
            return await createTuit(userCreated._id, tuit);
        }));

        const retrievedTuits = await findAllTuits();
        expect(retrievedTuits.length).toBeGreaterThanOrEqual(tuitList.length);
        const tuitsWeInserted = retrievedTuits.filter(
            tuit => tuit.postedBy === userCreated._id);

        tuitsWeInserted.forEach(tuitInserted => {
            const tuit = tuitList.find(tuit => tuit._id === tuitInserted._id);
            expect(tuitInserted.tuit).toEqual(tuit.tuit);
            expect(tuitInserted.postedBy).toEqual(userCreated._id);
        });
    });
});