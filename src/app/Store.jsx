import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../feature/auth/slice/AuthSlice.jsx'
import AdminStatus from '../feature/admin/slice/AdminStatusSlice.jsx'
import AdminAllUsers from '../feature/admin/slice/AdminUserSlice.jsx'
import AdminAllCompany from '../feature/admin/slice/AdminCompnaySlice.jsx'
import categorSlice from '../feature/admin/slice/CategorySlice.jsx'
import JobSlice from '../feature/admin/slice/AdminJobSlice.jsx'
import ApplicationSlice from '../feature/admin/slice/AdminAllApplicationSlice.jsx'
import EmployerRequestSlice from '../feature/admin/slice/AdminEmployerRequestSlice.jsx'

import NotificationSlice from '../feature/notification/slice/NotificationSlice.jsx'

import ProfileSlilce from '../feature/profile/slice/ProfileSlice.jsx'
import EmployerSlice from '../feature/jobs/slice/EmployerJobSlice.jsx'

import EmployerApplicationSlice from '../feature/application/slice/EmployerApplicationSlice.jsx'
import EmployerStatusSlice from '../feature/employer/slice/EmployerStatusSlice.jsx'

import RegisterSlice from '../feature/auth/slice/RegisterSlice.jsx'

export const Store = configureStore({
    reducer:{

        auth:AuthReducer,
        adminstatus: AdminStatus,
        alluser : AdminAllUsers,
        allcompany:AdminAllCompany,
        category:categorSlice,
        alljobs:JobSlice,
        allApplication : ApplicationSlice,
        employerRequests:EmployerRequestSlice,

        notification:NotificationSlice,

        profile : ProfileSlilce,
        myJobs:EmployerSlice,

        employerApplication : EmployerApplicationSlice,

        employerStatus:EmployerStatusSlice,

        register:RegisterSlice,
    }
})