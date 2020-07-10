<dynamic :expand="items">
    <div #element>
        <slot :render="children" :data="#element"/>
    </div>
</dynamic>