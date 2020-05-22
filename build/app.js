"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _morgan.default)('dev'));
const API_VERSION = '/api/v1';
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_express.default.static('./docs'));
app.get('/', (req, res) => {
  res.sendFile(_path.default.resolve('./docs/index.html'));
});
app.use(`${API_VERSION}`, _index.default);
app.all('*', (err, req, res, next) => {
  if (!err) return next();
  return res.status(400).json({
    status: 400,
    error: `Failed to decode param: ${req.url}`
  });
});
var _default = app;
exports.default = _default;
//# sourceMappingURL=app.js.map