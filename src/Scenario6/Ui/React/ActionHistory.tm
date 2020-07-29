<import component="ActionHistoryContextProvider" from="@app/Scenario6/Ui/React/ActionHistoryContext"/>
<import component="AnimateSharedLayout" from="framer-motion"/>
<import component="SceneContextProvider" from="@triones/markup-shim-react"/>
<template #default>
    <ActionHistoryContextProvider :value="#default">
        <SceneContextProvider :value="actionScene">
            <AnimateSharedLayout>
                <slot :render="children" />
            </AnimateSharedLayout>
        </SceneContextProvider>
    </ActionHistoryContextProvider>
</template>