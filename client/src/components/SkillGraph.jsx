import { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone";

const SkillGraph = ({ mockCandidates }) => {
  const networkRef = useRef(null);

  //   useEffect(() => console.log(networkRef), []);
  useEffect(() => {
    if (!networkRef.current || !mockCandidates?.length) return;

    const nodes = [];
    const edges = [];
    const skillNodesMap = {};

    mockCandidates.forEach((candidate) => {
      nodes.push({
        id: candidate.id,
        label: candidate.name,
        group: "candidate",
        value: candidate.aiScore / 10,
        shape: "circle",
        color: {
          background: "#99c2ff",
          border: "#77aaff",
          highlight: {
            background: "#bbddff",
            border: "#77aaff",
          },
        },
        font: { size: 12, color: "#000000" },
        borderWidth: 2,
        size: 25,
      });

      candidate.skills.forEach((skill) => {
        const skillNodeId = `skill-${skill}`;

        if (!skillNodesMap[skill]) {
          skillNodesMap[skill] = true;
          nodes.push({
            id: skillNodeId,
            label: skill,
            group: "skill",
            shape: "dot",
            color: {
              background: "#ffff00",
              border: "#dddd00",
              highlight: {
                background: "#ffff77",
                border: "#dddd00",
              },
            },
            font: { size: 10, color: "#555555" },
            size: 10,
          });
        }

        edges.push({
          from: candidate.id,
          to: skillNodeId,
          width: 0.5,
          color: { color: "#6dacf0", highlight: "#aaaaff" },
          length: 150,
        });
      });
    });

    const container = networkRef.current;
    const options = {
      nodes: { scaling: { min: 15, max: 40 }, font: { face: "Arial" } },
      edges: {
        width: 2,
        color: { color: "#bbbbbb", highlight: "#555555" },
        smooth: { type: "dynamic" },
      },
      physics: {
        barnesHut: {
          gravitationalConstant: -6000,
          centralGravity: 0.1,
          springLength: 250,
          springConstant: 0.04,
          damping: 0.1,
        },
        // repulsion: { nodeDistance: 300 },
        // solver: "barnesHut",
        // stabilization: { iterations: 500 },
      },
      layout: { improvedLayout: true },
      interaction: {
        dragNodes: true,
        hideEdgesOnDrag: false,
        tooltipDelay: 200,
      },
    };

    const network = new Network(container, { nodes, edges }, options);

    network.on("stabilizationIterationsDone", function () {
      network.setOptions({
        physics: { enabled: true, stabilization: false },
      });
    });

    return () => {
      network.destroy();
    };
  }, [mockCandidates]);

  return (
    <div className="opacity-100 transition-opacity duration-600 ease-in-out">
      <div className="shadow-lg bg-white border-1 border-gray-300 rounded-2xl overflow-hidden">
        <div className="py-3 mx-5 border-b border-gray-200">
          <h3 className="m-0 max-sm:text-2xl max-md:text-3xl md:text-4xl tracking-tight font-semibold">
            Candidate Skill Network
          </h3>
        </div>
        <div className="p-5">
          <div ref={networkRef} className="h-[600px] w-full bg-white" />
        </div>
      </div>
    </div>
  );
};

export default SkillGraph;
