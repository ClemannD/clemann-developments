import { Select } from '@clemann-developments/react/forms';
import { LeagueMemberType } from '../../../api-services/entities/userToLeague.entity';

export default function LeagueMemberTypeSelect() {
    return (
        <Select
            label="League Member Type"
            name="leagueMemberType"
            subLabel="Managers can modify league info, players can submit scores, and subs can only view lineups"
        >
            <option value={LeagueMemberType.Manager}>
                {LeagueMemberType.Manager}
            </option>
            <option value={LeagueMemberType.Player}>
                {LeagueMemberType.Player}
            </option>
            <option value={LeagueMemberType.Sub}>{LeagueMemberType.Sub}</option>
            <option value={LeagueMemberType.Inactive}>
                {LeagueMemberType.Inactive}
            </option>
        </Select>
    );
}
