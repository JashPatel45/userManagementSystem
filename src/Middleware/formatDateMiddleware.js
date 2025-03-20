const formatDate = (date) => {
    return date
      ? new Date(date).toLocaleString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : null;
  };
  
  const formatResponse = (res, data) => {
    if (Array.isArray(data)) {
      return res.status(200).json(
        data.map((item) => ({
          ...item._doc, // Ensure MongoDB document structure
          createdAt: formatDate(item.createdAt),
          updatedAt: formatDate(item.updatedAt),
        }))
      );
    } else if (typeof data === "object" && data !== null) {
      return res.status(200).json({
        ...data._doc,
        createdAt: formatDate(data.createdAt),
        updatedAt: formatDate(data.updatedAt),
      });
    } else {
      return res.status(200).json(data);
    }
  };
  
  export default formatResponse;
  