import dagviz
import networkx as nx

G = nx.DiGraph()
for i in range(5):
    G.add_node(f"n{i}")

G.add_edge("n0", "n1")
G.add_edge("n0", "n2")
G.add_edge("n0", "n4")
G.add_edge("n1", "n3")
G.add_edge("n2", "n3")
G.add_edge("n3", "n4")
r = dagviz.render_svg(G)
