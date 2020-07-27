<import from="@app/Scenario6/Ui/Disk"/>
<template #default>
    <TowerBox :ref="ref">
        <dynamic :expand="disks">
            <Disk #element :="#element" :tower="#default"/>
        </dynamic>
    </TowerBox>
</template>
<style>
    div.TowerBox {
        background: #cdcdcd;
        padding: 1em;
        margin: 0;
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;

        & > .disk {
            border-radius: 10px;
            margin-bottom: 10px;
            min-width: 20em;
            cursor: pointer;
            line-height: 80px;
            text-align: center;
        }
    }
</style>