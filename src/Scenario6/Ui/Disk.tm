<import from="@app/Scenario6/Ui/React/AnimatedBox"/>
<template #default>
    <AnimatedBox layout drag :isDragging="&isDragging" droppableModelClass="Scenario6/Ui/Tower" :model="#default" @onDragStart="onDragStart" @onDragEnd="onDragEnd">
        <attr #dragConstraint>{ "top":0, "bottom":0 }</attr>
        <attr #dragElastic>1</attr>
        <attr #style :background="background" :height="height" :zIndex="zIndex" />
        <attr #staticStyle>
            `
            border-radius: 10px;
            margin-bottom: 10px;
            min-width: 20em;
            line-height: 80px;
            text-align: center;
            `
        </attr>
        <attr #initial>false</attr>
        <attr #whileHover>{ "scale": 1.03, "boxShadow": "0px 3px 3px rgba(0,0,0,0.15)" }</attr>
        <attr #whileTap>{ "scale": 1.12, "boxShadow": "0px 5px 5px rgba(0,0,0,0.1)" }</attr>
    </AnimatedDiv>
</template>