import release from './release';
import debug from './development';

const Config = {
  'DataType': '2'
};
const env = process.env.NODE_ENV;

if(env === 'development') {
  Object.assign(Config, debug);
}
else {
  Object.assign(Config, release);
}

export default Config;