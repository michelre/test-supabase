<script>
    import {supabase} from './supabase'
    import {ref, onMounted} from 'vue'

    export default {
        setup() {
            const projects = ref([])
            const owners = ref([])
            const project = ref({name: '', owner: null})

            const loadProjects = async () => {
                let {data, error, status} = await supabase
                    .from('project')
                    .select('id, name, profile ( first_name, last_name ), document (id, object_id)')

                if (!error && status === 200) {
                    projects.value = data
                }
            }

            const loadOwners = async () => {
                let {data, error, status} = await supabase
                    .from('profile')
                    .select('id, first_name, last_name )')

                if (!error && status === 200) {
                    owners.value = data
                }
            }

            const addProject = async () => {
                const {data, error} = await supabase.from('project').insert(project.value)
                if (error) {
                    console.log(error)
                    return
                }

                loadProjects()
            }

            const deleteProject = async (id) => {
                const {data: documents} = await supabase.from('document').select('*').match({project_id: id})
                for(let i in documents){
                    await deleteFile(id, documents[i])
                }

                const {data, error} = await supabase.from('project').delete().match({id: id})
                if(error){
                    return
                }

                loadProjects()

            }

            const uploadFile = async (e, projectId) => {
                const file = e.target.files[0]
                const {data, error} = await supabase.storage.from('project-files').upload(`${projectId}/${file.name}`, file, {
                    cacheControl: '3600',
                    upsert: false
                })
                if(!error){
                    await supabase.from('document').insert({ object_id: data['Key'].replace('project-files/', ''), project_id: projectId })
                    e.target.value = ''
                }
                loadProjectDocuments(projectId)
            }

            const downloadFile = async (objectId) => {
                const {data, error} = await supabase.storage.from('project-files').createSignedUrl(objectId, 60*60)
                if(!error){
                    window.open(data.signedURL)
                }
            }

            const deleteFile = async (projectId, doc) => {
                const {error} = await supabase.storage.from('project-files').remove([doc.object_id])
                if(!error){
                    await supabase.from('document').delete().match({id: doc.id})
                    loadProjectDocuments(projectId)
                }
            }

            const loadProjectDocuments = async (pId) => {
                const {data} = await supabase.from('document').select('*').eq('project_id', pId)
                projects.value = projects.value.map(p => {
                    if(p.id === pId){
                        return {...p, document: data}
                    }
                    return p
                })
            }

            onMounted(() => {
                loadProjects()
                loadOwners()
            })


            return {
                projects,
                owners,
                project,
                addProject,
                deleteProject,
                uploadFile,
                downloadFile,
                deleteFile,
            }

        },

    }

</script>


<template>

    <div>

        <form @submit.prevent="addProject">
            <input placeholder="name" v-model="project.name">
            <select v-model="project.owner">
                <option v-for="owner in owners" :value="owner.id">{{owner.first_name}} {{owner.last_name}}</option>
            </select>
            <button type="submit">Ajouter le projet</button>
        </form>


        <table>
            <thead>
            <tr>
                <th>Nom</th>
                <th>Porteur</th>
                <th>Documents</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="project in projects">
                <td>{{project.name}}</td>
                <td>{{project.profile?.first_name}} {{project.profile?.last_name}}</td>
                <td>
                    <ul>
                        <li v-for="doc in project.document">
                            <a href="" @click.prevent="downloadFile(doc.object_id)">{{doc.object_id}}</a>
                            <button @click="deleteFile(project.id, doc)">X</button>
                        </li>
                    </ul>
                    <input type="file" @change="uploadFile($event, project.id)">
                </td>
                <td>
                    <button @click="deleteProject(project.id)">Supprimer</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

</template>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        color: #2c3e50;
        margin-top: 60px;
    }

    td, th {
        border: 1px solid black;
        padding: 5px 10px;
    }

    table {
        border-collapse: collapse;
    }
</style>
