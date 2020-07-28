<import component="ActionHistoryContextProvider" from="@app/Scenario6/Ui/ActionHistoryContext"/>
<import component="AnimateSharedLayout" from="framer-motion"/>
<import component="SceneContextProvider" from="@triones/markup-shim-react"/>
<import from="@app/Scenario6/Ui/Tower"/>
<template #default>
    <ActionHistoryContextProvider :value="#default">
        <SceneContextProvider :value="actionScene">
            <AnimateSharedLayout>
                <TowerRow>
                    <Tower/>
                    <Tower/>
                    <div>
                        <attr #style minWidth="10em"/>
                        <ul>
                            <dynamic :expand="actions">
                                <li #entry><button @onClick="undo">undo&nbsp;{{ #entry.element.name }}</button></li>
                            </dynamic>
                        </ul>
                    </div>
                </TowerRow>
        </AnimateSharedLayout>
        </SceneContextProvider>
    </ActionHistoryContextProvider>
</template>
<style>
    div.TowerRow {
        box-sizing: border-box;
        padding: 10em;
        margin: 0;
        display: flex;

        & div {
           margin: 1em; 
        }
    }
</style>