import gameCanvas from './canvas';

export default {
  ballSpecs: {
    x: 400,
    y: 400,
    radius: 10,
    startAngle: 0,
    endAngle: Math.PI * 2,
    color: 'white',
  },
  paddleSpecs: {
    offset: 20,
    width: 100,
    height: 20,
    color: '#FFFFFF',
  },
  brick: {
    width: 100,
    height: 20,
    color: 'yellow',
    visible: true,
  },
  life: {
    radius: 7,
    startAngle: 0,
    endAngle: Math.PI * 2,
    color: 'red',
  },
  welcome: {
    y: gameCanvas.halfHeight,
    x: gameCanvas.halfWidth,
    text: 'Click To Start',
    font: '20px serif',
    color: 'white',
  },
};

