<div>
    <attr #style minWidth="10em"/>
    <ul>
        <dynamic :expand="actionHistory.actions">
            <li #entry><button @onClick="undo">undo&nbsp;{{ #entry.element.name }}</button></li>
        </dynamic>
    </ul>
</div>