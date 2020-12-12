export default function createRequestTypes(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return [type, SUCCESS, FAILURE];
}
