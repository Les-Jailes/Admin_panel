const getDefaultTypes = (categoria) => {
    switch (categoria) {
      case "Women":
      case "Men":
      case "Boy":
        return [
          "Shirts",
          "T-shirts",
          "Sweaters",
          "Coats",
          "Suits",
          "Underwear",
          "Socks",
          "Pants",
          "Swimwear",
        ];
      case "Girl":
        return [
          "T-shirts",
          "Sweaters",
          "Coats",
          "Suits",
          "Underwear",
          "Socks",
          "Skirts",
          "Pants",
          "Swimwear",
        ];
      default:
        return [];
    }
  };
  
  export default getDefaultTypes;  