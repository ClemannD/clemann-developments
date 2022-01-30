import { useContext } from 'react';
import UserContext from '../context/user.context';

export default function useCurrentUser() {
    const { getCurrentUser } = useContext(UserContext);

    return {
        currentUser: getCurrentUser.data?.user,
        getCurrentUser,
        currentLeague: getCurrentUser.data?.currentLeague,
        currentLeagueMemberType: getCurrentUser.data?.user.userToLeague?.find(
            (userToLeague) =>
                userToLeague.leagueId ===
                getCurrentUser.data?.currentLeague.leagueId
        )?.leagueMemberType
    };
}
