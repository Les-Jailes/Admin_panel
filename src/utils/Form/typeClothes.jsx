const getDefaultType = (categoria) => {
    switch (categoria) {
      case "Women":
        return "Shirts";
      case "Men":
        return "Shirts";
      case "Boy":
        return "Shirts";
      case "Girl":
        return "T-shirts";
      default:
        return "";
    }
  };
  
  export default getDefaultType;
  