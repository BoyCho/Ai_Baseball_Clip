import { forwardRef, useState } from 'react';
import Video from './Video';
import Dialog from '../Dialog';
import { Clip } from '@/pages/VideoResultPage/type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { ProcessedVideoByInnings } from '@/api/type';
import { requestFavorite } from '@/api/requestFavorite';
import { useMutation } from '@tanstack/react-query';

type VideoModal = {
    processedVideo: ProcessedVideoByInnings[];
    isReadyToLoadVideo: boolean;
    onClick: () => void;
};

const VideoModal = forwardRef<HTMLDialogElement, VideoModal>(
    ({ processedVideo, isReadyToLoadVideo, onClick }: VideoModal, ref) => {
        const { mutate: deleteFavoriteVideo } = useMutation({
            mutationFn: (batId: number) => requestFavorite({ batId }),
        });
        if (processedVideo[0]) {
            const [isFavorite, setIsFavorite] = useState(processedVideo[0].favorite);
            return (
                <Dialog onClick={onClick} ref={ref}>
                    {isReadyToLoadVideo && (
                        <div className="video-container">
                            <div className="videoModal-title">
                                <FontAwesomeIcon
                                    icon={faBookmark}
                                    className={isFavorite ? 'bookmark favorite' : 'bookmark'}
                                    onClick={() => {
                                        deleteFavoriteVideo(processedVideo[0].batId);
                                        setIsFavorite(!isFavorite);
                                    }}
                                />
                                <span>VS {[processedVideo[0].pitcherName]}</span>

                                <button onClick={onClick}>X</button>
                            </div>

                            <Video
                                poster=""
                                src={processedVideo[0].processedVideoUrl}
                                source_type="mp4"
                            />
                        </div>
                    )}
                </Dialog>
            );
        }
    }
);

export default VideoModal;
