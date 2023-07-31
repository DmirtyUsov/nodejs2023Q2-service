import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_OPENAPI_FILENAME = '../doc/api.yaml';

export const OpenApiData = yaml.load(
  readFileSync(join(__dirname, YAML_OPENAPI_FILENAME), 'utf8'),
);
