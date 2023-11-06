import { useEffect } from "react";

const useHandleEffect = (formData, setSizes) => {
  useEffect(() => {
    const getCheckedSizes = () => {
      const updatedSizes = [];
      formData.size.forEach((sizeObj) => {
        if (sizeObj && sizeObj.size && sizeObj.quantity) {
          const newSize = sizeObj.size + " " + sizeObj.quantity;
          updatedSizes.push(newSize);
        }
      });
      setSizes(updatedSizes);
    };
    getCheckedSizes();
  }, [formData.size]);
};

export default useHandleEffect;