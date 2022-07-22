import * as React from 'react';
import { Viewer, Worker, Button, Position, Tooltip } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { highlightPlugin, Trigger,HighlightArea, SelectionData, MessageIcon, RenderHighlightTargetProps } from '@react-pdf-viewer/highlight';
import '@react-pdf-viewer/highlight/lib/styles/index.css';

// import path from 'path';
// import fs from 'fs';
// import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';
// import PDFJSWorker from 'worker-loader?esModule=false&filename=[name].[contenthash].js!pdfjs-dist/legacy/build/pdf.worker';

// import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'
// import PDFJSWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry'



const App = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    // const pdfjs = import('./node_modules/pdfjs-dist/build/pdf');
    // const pdfjsWorker = import('./node_modules/pdfjs-dist/build/pdf.worker.entry');

    // const pdfjsDistPath = path.dirname(require.resolve('@types/pdfjs-dist/package.json'));
    // const pdfWorkerPath = path.join(pdfjsDistPath, 'legacy', 'build', 'pdf.worker.js');

    // const pdfjs = await import('../node_modules/pdfjs-dist/build/pdf');
    // const pdfjsWorker = await import('../node_modules/pdfjs-dist/build/pdf.worker.entry');
    // pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker
    // pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

    // pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerPath;


    const renderHighlightTarget = (props) => (
        <div
            style={{
                background: '#eee',
                display: 'flex',
                position: 'absolute',
                left: `${props.selectionRegion.left}%`,
                top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                transform: 'translate(0, 8px)',
            }}
        >
            <Tooltip
                position={Position.TopCenter}
                target={
                    <Button onClick={props.toggle}>
                        <MessageIcon />
                    </Button>
                }
                content={() => <div style={{ width: '100px' }}>Add a note</div>}
                offset={{ left: 0, top: -8 }}
            />
        </div>
    );

    const areas = [
        {
            pageIndex: 3,
            height: 1.55401,
            width: 28.1674,
            left: 27.5399,
            top: 15.0772,
        },
        {
            pageIndex: 3,
            height: 1.32637,
            width: 37.477,
            left: 55.7062,
            top: 15.2715,
        },
        {
            pageIndex: 3,
            height: 1.55401,
            width: 28.7437,
            left: 16.3638,
            top: 16.6616,
        },
    ];

    const renderHighlights = (props) => (
        <div>
            {areas
                .filter((area) => area.pageIndex === props.pageIndex)
                .map((area, idx) => (
                    <div
                        key={idx}
                        className="highlight-area"
                        style={Object.assign(
                            {},
                            {
                                background: 'yellow',
                                opacity: 0.4,
                            },
                            // Calculate the position
                            // to make the highlight area displayed at the desired position
                            // when users zoom or rotate the document
                            props.getCssProperties(area, props.rotation)
                        )}
                    />
                ))}
        </div>
    );

    const highlightPluginInstance = highlightPlugin({
        renderHighlights,
        trigger: Trigger.None,
    });

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.js">
            <div
                style={{
                    height: '750px',
                    width: '900px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Viewer
                    fileUrl={`${process.env.PUBLIC_URL}/pdf-open-parameters.pdf`}
                    plugins={[defaultLayoutPluginInstance,highlightPluginInstance]}
                />
            </div>
        </Worker>
    );
};

export default App;
