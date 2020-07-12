<dynamic :visible="hasMore">
    <slot :render="sentinel" />
</dynamic>
<dynamic :expand="counters">
    <div #element>
        {{ pageNumber }} / {{ #element.value }}
    </div>
</dynamic>
<dynamic :visible="reachedEnd">
    <div>reached end</div>
</dynamic>