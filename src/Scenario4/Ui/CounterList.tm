<import from="@app/Scenario4/Ui/CounterForm" as="Counter_"/>
<template #default>
    <dynamic :expand="notDeletedCounters">
        <Counter_ #element :="#element" />
    </dynamic>
    <button @onClick="onAdd">add counter</button>
    <dynamic :visible="hasSelected">
        <button @onClick="onDelete">delete selected counters</button>
    </dynamic>
    <button @onClick="onSave">save</button>
</template>