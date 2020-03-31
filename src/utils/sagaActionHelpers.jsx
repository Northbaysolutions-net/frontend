export const action = (actionType, payload) => {
  return {
    type: actionType,
    payload
  };
};

export function sagaFormatHandler(selection) {
  return {
    request: payload => action(`${selection}_REQUEST`, payload),
    success: payload => action(`${selection}_SUCCESS`, payload),
    failure: payload => action(`${selection}_FAILURE`, payload),
  };
}
