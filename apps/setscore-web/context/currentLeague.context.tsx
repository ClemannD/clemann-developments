import { createContext } from 'react';
import { League } from '../api-services/entities/league.entity';

const CurrentLeagueContext = createContext<League>(null);
export default CurrentLeagueContext;
