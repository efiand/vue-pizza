export const formatAddress = ({ street, building, flat }) => {
  return [street, building ? `д. ${building}` : "", flat ? `кв. ${flat}` : ""]
    .filter(Boolean)
    .join(", ");
};
