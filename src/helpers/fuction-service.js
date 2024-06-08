import dayjs from "dayjs";
import 'dayjs/locale/th';

dayjs.locale('th');
const formatDate = (date) => {
    return dayjs(date, "DD/MM/YYYY").add(543, 'year').format("DD/MM/YYYY");
};

export default formatDate;
