export interface TreeNode {
  id: string;
  title: string;
  icon?: string;
  children?: TreeNode[];
  link?: string;
}