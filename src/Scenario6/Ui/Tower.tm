<import from="@app/Scenario6/Ui/Disk"/>
<template #default>
    <TowerBox :data-view-class="#default.constructor.name" :data-view-id="#default.id">
        <dynamic :expand="disks">
            <Disk #element :="#element" />
        </dynamic>
    </TowerBox>
</template>
<style>
    div.TowerBox {
        background: #e6e6e6;
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
            line-height: 80px;
            text-align: center;
        }
    }
</style>