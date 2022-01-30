import {
    ArrowNarrowDownIcon,
    ArrowNarrowUpIcon
} from '@heroicons/react/outline';
import React from 'react';
import PullToRefreshLib from './ptr.lib.component';
import Refreshing from './refreshing.component';

export default function PullToRefresh({
    onRefresh,
    children
}: {
    onRefresh: () => void;
    children: any;
}) {
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    return (
        <PullToRefreshLib
            onRefresh={async () => {
                await onRefresh();
                // await sleep(250);
            }}
            refreshingContent={<Refreshing />}
            pullDownThreshold={55}
            maxPullDownDistance={70}
            pullingContent={
                <div
                    style={{
                        textAlign: 'center',
                        paddingTop: '2.5rem'
                    }}
                >
                    <ArrowNarrowDownIcon
                        height="15"
                        className="grayDarker"
                    ></ArrowNarrowDownIcon>
                    <p className="grayDarker smaller">Pull to refresh</p>
                </div>
            }
            pulledPastThresholdContent={
                <div
                    style={{
                        textAlign: 'center',
                        paddingTop: '2.5rem'
                    }}
                >
                    <ArrowNarrowUpIcon
                        height="15"
                        className="grayDarker"
                    ></ArrowNarrowUpIcon>
                    <p className="grayDarker smaller">Let go to refresh</p>
                </div>
            }
        >
            {children}
        </PullToRefreshLib>
    );
}
