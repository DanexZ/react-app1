exports.getDate = (time, format = null, separator = null) => {
  if (!separator) separator = "-";

  const date = new Date(time);

  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  if (mm < 10) mm = "0" + mm;
  if (dd < 10) dd = "0" + dd;

  if (format === "polish") {
    return `${dd}${separator}${mm}${separator}${yyyy}`;
  } else {
    return `${yyyy}${separator}${mm}${separator}${dd}`;
  }
};
