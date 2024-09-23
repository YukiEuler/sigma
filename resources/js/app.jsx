import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import * as pages from './pages';

createInertiaApp({
    resolve: name => pages[name],
    setup({ el, App, props }) {
        render(<App {...props} />, el);
    },
});

InertiaProgress.init();