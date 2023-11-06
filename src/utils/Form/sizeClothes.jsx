const getDefaultSize = (categoria) => {
    switch (categoria) {
      case "Women":
      case "Men":
        return ["XS", "S", "M", "L", "XL", "XXL"];
      case "Boy":
      case "Girl":
        return ["2", "4", "6", "8", "10", "12"];
      default:
        return [];
    }
  };
  
  export default getDefaultSize;  