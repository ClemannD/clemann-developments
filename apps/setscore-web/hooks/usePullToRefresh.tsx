import { useEffect, useState } from 'react';
import PullToRefresh from 'pulltorefreshjs';
import ReactDOMServer from 'react-dom/server';
import { ScaleLoader } from 'react-spinners';

export default function usePullToRefresh(
    onRefresh: (...args) => void,
    ...args
) {
    const [pullToRefreshInstance, setPullToRefreshInstance] = useState<any>();

    useEffect(() => {
        console.log(args);
    }, [args]);

    // useEffect(() => {
    PullToRefresh.destroyAll();
    const instance = PullToRefresh.init({
        mainElement: '#pageViewport',
        iconRefreshing: ReactDOMServer.renderToString(
            <ScaleLoader
                color="#57a773"
                height={'10px'}
                width={'3px'}
            ></ScaleLoader>
        ),
        onRefresh: async (done) => {
            await onRefresh(args);
            done();
        }
    });

    setPullToRefreshInstance(instance);

    // return () => {
    //     PullToRefresh.destroyAll();
    // };
    // }, [args]);
}
