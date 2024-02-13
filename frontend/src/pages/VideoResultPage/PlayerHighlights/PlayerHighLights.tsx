import { useState } from 'react';
import TeamSelectBar from './TeamSelectBar';
import HighlightContainer from './HighlightContainer';
import { useQuery } from '@tanstack/react-query';
import { requestTeamInfo } from '@/api/requestReportView';
import { SelectedTeam } from '../VideoResultOverview/VideoResultOverview';
import Loading from '@/components/Loading';

export default function PlayerHighLights() {
    const { data, isLoading, isError } = useQuery({
        queryFn: requestTeamInfo,
        queryKey: ['teamInfo'],
    });
    const [currentTeam, setCurrentTeam] = useState<SelectedTeam>('firstTeam');
    const onClickChangeTeam = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget instanceof HTMLElement) {
            if (currentTeam === 'firstTeam' && e.currentTarget.classList.contains('firstTeam'))
                return;
            else if (
                currentTeam === 'secondTeam' &&
                e.currentTarget.classList.contains('secondTeam')
            )
                return;
            setCurrentTeam((prev: SelectedTeam) => {
                if (prev === 'firstTeam') return 'secondTeam';
                else return 'firstTeam';
            });
        }
    };
    if (isLoading) return <Loading />;
    if (data?.data)
        return (
            <div className="highLightPage">
                <TeamSelectBar
                    teamData={data.data}
                    currentTeam={currentTeam}
                    onClick={onClickChangeTeam}
                />
                <HighlightContainer team={currentTeam} />
            </div>
        );
}
