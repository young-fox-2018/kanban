<template>
    <div>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Uppsss...!</strong> {{errorInput.ErrMsg}}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['errorInput']
}
</script>
