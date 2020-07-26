<import from="@app/Scenario6/Ui/Disk"/>
<template #default>
    <TowerBox>
        <dynamic :expand="disks">
            <Disk #element :="#element" />
        </dynamic>
    </TowerBox>
</template>
<style>
    div.TowerBox {
        width: 100vw;
        height: 100vh;
        background: white;
        overflow: hidden;
        padding: 0;
        margin: 0;
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>