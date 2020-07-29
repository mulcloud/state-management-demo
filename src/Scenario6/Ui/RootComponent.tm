<import from="@app/Scenario6/Ui/React/ActionHistory"/>
<import from="@app/Scenario6/Ui/ActionPanel"/>
<import from="@app/Scenario6/Ui/Tower"/>
<template #default>
    <ActionHistory :="actionHistory">
        <TowerRow>
            <Tower/>
            <Tower/>
            <ActionPanel :actionHistory="actionHistory" />
        </TowerRow>
    </ActionHistory>
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

