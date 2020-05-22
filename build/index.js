"use strict";

var _winston = _interopRequireDefault(require("winston"));

var _app = _interopRequireDefault(require("./app"));

var _config = _interopRequireDefault(require("./utils/config.utilities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = _config.default.port || 3000;

const logger = _winston.default.createLogger({
  transports: [new _winston.default.transports.Console()]
});

_app.default.listen(port, () => logger.info(`Application running on port ${port}`));
//# sourceMappingURL=index.js.map