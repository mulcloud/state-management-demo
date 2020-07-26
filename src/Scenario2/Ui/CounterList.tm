<import from="@app/Scenario2/Ui/CounterForm" as="Counter_"/>
<template #default>
    <dynamic :expand="counters">
        <Counter_ #element :="#element" />
    </dynamic>
    <button @onClick="onAdd">add counter</button>
    <dynamic :visible="hasSelected">
        <button @onClick="onDelete">delete selected counters</button>
    </dynamic>
    <button @onClick="onSave">save to db</button>
    <button @onClick="onList">list db records</button>
</template>