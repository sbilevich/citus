import { useEffect, useMemo, useState } from "react";
import Tree from "react-d3-tree";
import childNodes from './mocks/get_child_nodes_200_response.json'
import conditionNode from './mocks/get_condition_by_id_2002_response.json'
import conclusionNode from './mocks/get_conclusion_by_id_140010_response.json'



const data = [getRootNode(rootNode)]


const getRootNode = (node) => ({
    id: node.identifier,
    name: node["situsTreatment.prefLabel"]
})

const getNodes = (nodes) => {

}
const rootNode =
{
    identifier: 200,
    "situsTreatment.identifier": 1,
    "situsTreatment.prefLabel": "TPP/Goods"
}


export const SitusTree = () => {
    const [st, setSt] = useState(null);
    const map = useMemo(() => new Map(), [])

    useEffect(() => {
        const response = [...data];

        setSt(response);
        response.forEach(item => map.set(item.id, item))
    }, [])

    if (!st) return null;
    return (
        <div style={{ width: '100%', height: '800px' }}>
            <Tree data={st} onNodeClick={(node, event) => {
                if (!node.data.children) {
                    const id = node.data.id;
                    const res = Array.from({ length: 5 }, (_, index) => ({
                        name: `${id}_child_${index}`,
                        id: `${id}_child_${index}`
                    }))

                    const item = map.get(id);
                    item.children = res;

                    res.forEach(it => map.set(it.id, it))

                    setSt([...st])
                }
            }} />
        </div>
    )
}