export type FrameItem = {
  id: string;
  frameNumber: number;
  source: number;
};

const images = [
  require('../../assets/frames/frame-01.jpg'),
  require('../../assets/frames/frame-02.jpg'),
  require('../../assets/frames/frame-03.jpg'),
  require('../../assets/frames/frame-04.jpg'),
  require('../../assets/frames/frame-05.jpg'),
  require('../../assets/frames/frame-06.jpg'),
  require('../../assets/frames/frame-07.jpg'),
  require('../../assets/frames/frame-08.jpg'),
  require('../../assets/frames/frame-09.jpg'),
  require('../../assets/frames/frame-10.jpg'),
  require('../../assets/frames/frame-11.jpg'),
  require('../../assets/frames/frame-12.jpg'),
  require('../../assets/frames/frame-13.jpg'),
  require('../../assets/frames/frame-14.jpg'),
  require('../../assets/frames/frame-15.jpg'),
  require('../../assets/frames/frame-16.jpg'),
  require('../../assets/frames/frame-01.jpg'),
  require('../../assets/frames/frame-03.jpg'),
  require('../../assets/frames/frame-05.jpg'),
  require('../../assets/frames/frame-07.jpg'),
  require('../../assets/frames/frame-02.jpg'),
  require('../../assets/frames/frame-04.jpg'),
  require('../../assets/frames/frame-06.jpg'),
  require('../../assets/frames/frame-08.jpg'),
];

/** Contact sheet starts around classic mid-roll frame numbers */
const START = 42;

export const frames: FrameItem[] = images.map((source, index) => ({
  id: `frame-${index}`,
  frameNumber: START + index,
  source,
}));
