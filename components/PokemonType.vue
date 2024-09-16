<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
    type: string;
    size?: "sm" | "md" | "lg";
    selectable?: boolean;
    selected?: boolean;
}>();

const emit = defineEmits(["click"]);

const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
};

const getTypeClasses = (type: string): string => {
    switch (type.toLowerCase()) {
        case "normal":
            return "bg-gray-300 text-gray-800 border-gray-400";
        case "fighting":
            return "bg-red-500 text-white border-red-600";
        case "flying":
            return "bg-indigo-300 text-indigo-900 border-indigo-400";
        case "poison":
            return "bg-purple-400 text-white border-purple-500";
        case "ground":
            return "bg-yellow-600 text-white border-yellow-700";
        case "rock":
            return "bg-yellow-800 text-white border-yellow-900";
        case "bug":
            return "bg-lime-400 text-lime-900 border-lime-500";
        case "ghost":
            return "bg-purple-600 text-white border-purple-700";
        case "steel":
            return "bg-gray-400 text-gray-900 border-gray-500";
        case "fire":
            return "bg-red-500 text-white border-red-600";
        case "water":
            return "bg-blue-500 text-white border-blue-600";
        case "grass":
            return "bg-green-500 text-white border-green-600";
        case "electric":
            return "bg-yellow-400 text-yellow-900 border-yellow-500";
        case "psychic":
            return "bg-pink-400 text-white border-pink-500";
        case "ice":
            return "bg-cyan-300 text-cyan-900 border-cyan-400";
        case "dragon":
            return "bg-indigo-600 text-white border-indigo-700";
        case "dark":
            return "bg-gray-800 text-white border-gray-900";
        case "fairy":
            return "bg-pink-300 text-pink-900 border-pink-400";
        case "stellar":
            return "bg-purple-300 text-purple-900 border-purple-400";
        default:
            return "bg-gray-300 text-gray-800 border-gray-400";
    }
};

const handleClick = () => {
    if (props.selectable) {
        emit("click");
    }
};
</script>

<template>
    <component
        :is="selectable ? 'button' : 'span'"
        :class="[
            'rounded-full font-semibold uppercase transition-all duration-200 inline-block',
            sizeClasses[size || 'md'],
            getTypeClasses(type),
            {
                'cursor-pointer border-2': selectable,
                'ring-2 ring-offset-2 ring-blue-500': selected,
                'opacity-70 hover:opacity-100': selectable && !selected,
            },
        ]"
        @click="handleClick"
        :type="selected ? 'button' : undefined"
    >
        {{ t(`types.${type}`) }}
    </component>
</template>
