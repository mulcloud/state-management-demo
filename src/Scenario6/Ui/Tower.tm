<import component="AnimateSharedLayout" from="framer-motion"/>
<import from="@app/Scenario6/Ui/Disk"/>
<template #default>
    <TowerBox>
        <AnimateSharedLayout>
            <dynamic :expand="disks">
                <Disk #element :="#element" />
            </dynamic>
        </AnimateSharedLayout>
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
        
        & > .disk {
            border-radius: 10px;
            margin-bottom: 10px;
            min-width: 20em;
            cursor: pointer;
            line-height: 80px;
            text-align: center;
            position: relative;
        }
    }
</style>