import {act, create} from 'react-test-renderer';
import TuitStats from "../components/tuits/tuit-stats";
import React, { useState, useEffect } from "react";


test('dislike stats render correctly', () => {
  let stats = {
    likes: 123,
    dislikes: 120,
    replies: 234,
    retuits: 345
  }

  const dislikeTuit = () => {
    act(() => {
      stats.dislikes++;
      tuitStats.update(
          <TuitStats
              tuit={{stats: stats}}
              disikeTuit={() => {}}
          />)
    })
  }

  let tuitStats = () => {
    act(() => {
      tuitStats = create(
          <TuitStats
              dislikeTuit={dislikeTuit}
              tuit={{stats: stats}}/>
      );
    })
  }

  const root = tuitStats.root;
  const dislikesCounter = root.findByProps({className: 'ttr-stats-dislikes'})
  const retuitsCounter = root.findByProps({className: 'ttr-stats-retuits'})
  const repliesCounter = root.findByProps({className: 'ttr-stats-replies'})
  const dislikeTuitButton = root.findByProps(
      {className: 'ttr-dislike-tuit-click'})

  let dislikesText = dislikesCounter.children[0];
  const repliesText = repliesCounter.children[0];
  const retuitsText = retuitsCounter.children[0];
  expect(dislikesText).toBe('119');
  expect(repliesText).toBe('234');
  expect(retuitsText).toBe('345');

  act(() => {dislikeTuitButton.props.onClick()})
  dislikesText = dislikesCounter.children[0];
  expect(dislikesText).toBe('119');
});




