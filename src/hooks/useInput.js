const { useState, useCallback } = require('react');

function useInput(initialValue = null) {
  const [value, setValue] = useState(initialValue);
  const onChangeValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, setValue, onChangeValue];
}

export default useInput;
