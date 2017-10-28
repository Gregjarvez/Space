import Rect from './rect';

class Canvas extends Rect {
  constructor(canvas, specs) {
    super(specs);
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
  }

  repaint = () => {
    this.drawRect(this._context, this);
  }

  get halfWidth() {
    return this._canvas.width / 2;
  }

  get halfHeight() {
    return this._canvas.height / 2;
  }
}

const c = document.querySelector('#canvas');
const specs = {
  x: 0,
  y: 0,
  width: c.width,
  height: c.height,
  color: 'black',
};
const gameCanvas = new Canvas(c, specs);

const { _canvas: canvas, _context: ctx, repaint } = gameCanvas;

export { canvas, ctx, repaint };
export default gameCanvas;
