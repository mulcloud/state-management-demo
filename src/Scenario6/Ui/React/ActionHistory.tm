<import component="ActionHistoryContextProvider" from="@app/Scenario6/Ui/React/ActionHistoryContext"/>
<import component="AutoMemoContextProvider" from="@triones/markup-shim-react"/>
<import component="SceneContextProvider" from="@triones/markup-shim-react"/>
<template #default>
    <!-- pass action history down to allow child report new action to history -->
    <ActionHistoryContextProvider :value="#default">
        <!-- wrap children in a new scene to commit/rollback change without affecting other components -->
        <SceneContextProvider :value="actionScene">
            <!-- disable auto wrapping React.memo to make animation work -->
            <AutoMemoContextProvider>
                <attr #value>false</attr>
                <slot :render="clonedChildren" />
            </AutoMemoContextProvider>
        </SceneContextProvider>
    </ActionHistoryContextProvider>
</template>