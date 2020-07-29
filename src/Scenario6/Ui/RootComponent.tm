<import from="@app/Scenario6/Ui/React/ActionHistory"/>
<import from="@app/Scenario6/Ui/ActionPanel"/>
<import component="AnimateSharedLayout" from="framer-motion"/>
<import from="@app/Scenario6/Ui/Tower"/>
<template #default>           
    <AnimateSharedLayout>
        <TowerRow>
            <ActionHistory :="actionHistory">
                <Tower />
                <Tower />
            </ActionHistory>
            <ActionPanel :actionHistory="actionHistory" />
        </TowerRow>
    </AnimateSharedLayout>
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