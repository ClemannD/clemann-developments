import LoadingScreen from '../../../components/navigation/loading-screen/loading-screen';
import useNavigateToCurrentMonth from '../../../hooks/useNavigateToCurrentMonth';

export default function MonthMissingMonthPage() {
    useNavigateToCurrentMonth();

    return <LoadingScreen></LoadingScreen>;
}
