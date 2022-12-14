/* @refresh reload */
import { router } from '@klevn/solid-router';

import './index.css';

/* Page Imports */
import Resources from './pages/resources/resources';
import AddResources from './pages/addResources/addResources'


router.add("/", () => {
    return <Resources></Resources>
})

router.add("/add", () => {
    return <AddResources></AddResources>
})

// Important
router.update()